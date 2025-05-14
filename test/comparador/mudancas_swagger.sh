#!/bin/bash 

# Verifica se foram fornecidos dois arquivos como argumentos
if [ $# -lt 2 ]; then
  echo "Uso: $0 arquivo1.json arquivo2.json"
  exit 1
fi

# Extrai os endpoints do primeiro arquivo
endpoints_arquivo1=$(jq -r '.paths | keys | .[]' "$1")

# Extrai os endpoints do segundo arquivo
endpoints_arquivo2=$(jq -r '.paths | keys | .[]' "$2")

# Compara e identifica novos endpoints
novo_endpoints=()
for endpoint in $endpoints_arquivo2; do
  if ! grep -q "$endpoint" <<< "$endpoints_arquivo1"; then
    novo_endpoints+=("$endpoint")
  fi
done

# Compara os arquivos para detectar mudanças textuais
diff_output=$(diff -u "$1" "$2")

# Cria nome do arquivo de saída
timestamp=$(date +"%Y%m%d%H%M%S")
arquivo_saida="mudancas_swagger_${timestamp}.diff"

# Cabeçalho do arquivo
echo "Arquivo 1: $1" > "$arquivo_saida"
echo "Arquivo 2: $2" >> "$arquivo_saida"
echo "" >> "$arquivo_saida"

# Novos endpoints adicionados
echo "Novos endpoints adicionados:" >> "$arquivo_saida"
if [ ${#novo_endpoints[@]} -eq 0 ]; then
  echo "(nenhum encontrado)" >> "$arquivo_saida"
else
  for novo_endpoint in "${novo_endpoints[@]}"; do
    echo "- $novo_endpoint" >> "$arquivo_saida"
  done
fi

echo "" >> "$arquivo_saida"
echo "Partes alteradas no arquivo Swagger JSON:" >> "$arquivo_saida"
echo "$diff_output" >> "$arquivo_saida"

echo "Resultado salvo em $arquivo_saida"
