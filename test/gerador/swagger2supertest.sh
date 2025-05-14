#!/bin/bash

PARAMETERS_FILE="parameters.json"

# Array de endpoints a serem excluídos
endpoints_excluidos=(
   
  # Adicione mais endpoints caso necessário 
)

# Função para verificar se um endpoint deve ser excluído
function verificar_exclusao_endpoint() {
  local endpoint=$1

  for excluded in "${endpoints_excluidos[@]}"; do
    if [[ $endpoint == $excluded ]]; then
      return 0
    fi
  done

  return 1
}

function get_body_for_route() {
  local route="$1"
  local method="$2"

  # Escapa aspas para evitar erro no jq
  route_escaped=$(echo "$route" | sed 's/"/\\"/g')

  body=$(jq -c --arg path "$route" --arg method "$method" \
    '.[$path][$method].body // {}' "$PARAMETERS_FILE")

  echo "$body"
}

# Faz o download do arquivo Swagger JSON da URL especificada
SWAGGER_URL="http://localhost:3000/swagger.json"

curl -k -o swagger.json "$SWAGGER_URL"

# Define o nome do arquivo Swagger JSON
SWAGGER_FILE="swagger.json"
OUTPUT_FILE="api.spec.js"

rm "$OUTPUT_FILE"

# Extrai as rotas da API do arquivo Swagger JSON e armazena em um arquivo temporário
TMP_FILE=$(mktemp)
jq -r '.paths | keys[]' "$SWAGGER_FILE" > "$TMP_FILE"

# Cria um arquivo de teste para cada rota da API
echo "const request = require('supertest');" >> "$OUTPUT_FILE"
echo "const app = require('../../app');" >> "$OUTPUT_FILE"
echo "const sequelize = require('../../config/database');" >> "$OUTPUT_FILE"
echo "const seed = require('../../seed');" >> "$OUTPUT_FILE"
echo "const id = 1;" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "beforeAll(async () => {" >> "$OUTPUT_FILE"
echo "  await sequelize.sync({ force: true });" >> "$OUTPUT_FILE"
echo "  await seed();" >> "$OUTPUT_FILE"
echo "});" >> "$OUTPUT_FILE"       
echo "" >> "$OUTPUT_FILE"
echo "describe('API', function () {" >> "$OUTPUT_FILE"
while read -r route; do
  # Coleta todos os métodos disponíveis para a rota
  METHODS=$(jq -r ".paths[\"$route\"] | keys[]" "$SWAGGER_FILE")

  delete_block=""

  for METHOD in $METHODS; do
    URL="$route"
    SUMMARY=$(jq -r ".paths[\"$route\"].$METHOD.summary" "$SWAGGER_FILE")
    BODY=$(get_body_for_route "$URL" "$METHOD")

    if verificar_exclusao_endpoint "$route"; then
      continue
    fi

    TEST_URL=$(echo "$URL" | sed -E 's/\{[^}]+\}/${id}/g')

    if [[ "$METHOD" != "delete" ]]; then
      echo "" >> "$OUTPUT_FILE"
      echo "  describe('$METHOD - $URL - $SUMMARY', function () {" >> "$OUTPUT_FILE"

      if [[ "$METHOD" == "get" ]]; then
        echo "    it('Deve retornar o status code 200', async () => {" >> "$OUTPUT_FILE"
        echo "       const res = await request(app).get(\`$TEST_URL\`);" >> "$OUTPUT_FILE"
        echo "       expect(res.statusCode).toBe(200);" >> "$OUTPUT_FILE"
        echo "    });" >> "$OUTPUT_FILE"

      elif [[ "$METHOD" == "post" ]]; then
          echo "    it('Deve retornar 201 ao criar recurso', async () => {" >> "$OUTPUT_FILE"
          echo "       const res = await request(app)" >> "$OUTPUT_FILE"
          echo "         .post(\`$TEST_URL\`)" >> "$OUTPUT_FILE" 
          echo "         .send($BODY)" >> "$OUTPUT_FILE"
          echo "         .set('Accept', 'application/json');" >> "$OUTPUT_FILE"
          echo "       expect([200, 201]).toContain(res.statusCode);" >> "$OUTPUT_FILE"
          echo "    });" >> "$OUTPUT_FILE"

      elif [[ "$METHOD" == "put" ]]; then
        echo "    it('Deve atualizar o recurso e retornar status 200', async () => {" >> "$OUTPUT_FILE"
        echo "       const res = await request(app)" >> "$OUTPUT_FILE"
        echo "         .put(\`$TEST_URL\`)" >> "$OUTPUT_FILE" 
        echo "         .send($BODY)" >> "$OUTPUT_FILE"
        echo "         .set('Accept', 'application/json');" >> "$OUTPUT_FILE"
        echo "       expect(res.statusCode).toBe(200);" >> "$OUTPUT_FILE"
        echo "    });" >> "$OUTPUT_FILE"
      fi

      echo "  });" >> "$OUTPUT_FILE"
    else
      # Armazena o bloco DELETE para imprimir depois
      delete_block+="\n  describe('$METHOD - $URL - $SUMMARY', function () {\n"
      delete_block+="    it('Deve retornar o status code 204 ao remover', async () => {\n"
      delete_block+="       const res = await request(app).delete(\`$TEST_URL\`);\n"
      delete_block+="       expect(res.statusCode).toBe(204);\n"
      delete_block+="    });\n"
      delete_block+="  });\n"
    fi
  done

  # Imprime o bloco DELETE por último (se existir)
  if [[ -n "$delete_block" ]]; then
    echo -e "$delete_block" >> "$OUTPUT_FILE"
  fi
done < "$TMP_FILE"
echo "});" >> "$OUTPUT_FILE" 

 
# Remove o arquivo temporário
rm "$TMP_FILE"

echo "Arquivo de teste gerado com sucesso em $OUTPUT_FILE!"

# Define o nome do arquivo de saída para o SuperTest

input_file="api.spec.js"
output_file_final="api_auto_gerado.spec.js"

# Verifica se o arquivo de entrada existe
if [ ! -f "$input_file" ]; then
  echo "O arquivo de entrada '$input_file' não existe."
  exit 1
fi

# Realiza a substituição do termo
sed 's/\/{/\/${/g' "$input_file" > "$output_file_final"

echo "Substituição concluída. O arquivo modificado foi salvo em '$output_file_final'."

rm "$input_file"
echo "Arquivo '$input_file' foi removido com sucesso."
