Dupla:
	Jardel Brandão dos Santos
	Sarah de Oliveira Ferreira

Como dito no forms enviado, foi desenvolvida uma API para a aprte do backend, logo, necessita de uma banco de dados e que a mesma esteja rodando. O código da API será enviado e será necessário a criação de um banco postgres SQL (utilizamos o pgAdmin por ter uma melhor interface) e a configuração desse banco com seu IP. 

Os arquivos tem sua divisão entre back e front. Dito isto, para configurar o back será necessário alterar:
	- o arquivo knexfile.js que está em orders-backend/src/config/knexfile.js que está cofigurando a conexão do banco (conexão com um banco local, localhost).

	- agora precisamos criar e rodar as migrations;
		Criar migrations: knex --knexfile src/config/knexfile.js --migrations-directory ../database/migrations migrate:make test -x cjs
		
		Rodar migrations: knex migrate:latest --knexfile ./src/config/knexfile.cjs

Com o backend rodando, pode-se usar algum software de requisição para popular o banco (usamos o imsonia) da seguinte forma:

Reposição GET: http://localhost:8080/users
no body da requisição (exemplo): 
{
	"name": "Jardel Brandão dos Santos",
	"email": "jardelbrando@gmail.com",
	"password": "password"
}

Isso cria um usuário (como nosso sistema é previsto para um restaurante, não se pode deixar o cliente criar uma conta livremente, então as contas são gerenciadas pela gerência ou alguma parte da TI).

Agora é necessário gerar um token: 

Reposição POST: http://localhost:8080/tokens
{
	"email": "jardelbrando@gmail.com",
	"password": "password"
}

o token gerado irá nos headers das reposições seguintes (pois exigem autenticação):

adicionar os seguintes headers:
Content-Type		application/json
Authorization		Bearer TokenGerado

Agora pode-se cadastrar pratos para o restaurante:

Requisição POST: http://localhost:8080/dishes

{
	"name": "Suco de Laranja",
	"price": 7,
	"description": "Suco natural de laranja sem açucar (açucar ao gosto do cliente)",
	"avatar_url":"https://padarialider.loji.com.br/storage/uploads/XvG9mfmDbukWCd4rcEM6iSgjJFRvBDbC4cnybRFx.webp",
	"category": "drinks"
}

(as categorys são divididas em meet, pasta, salad, dessert e drinks), pode se adicionar quantos pratos desejar.

Pode-se executar o front (o apk foi gerado com a conexão local que irá ficar rodando durante o horário da aula, mas está sujeito a crashs, então é preferível testar ambos numa máquina usando o android studio). 

Para o front, com os arquivos, na pasta do front, rodar um npm install para as dependências e rodar com o expo. Após isso, é necessário alterar os arquivos que exigem alguma requisição do back (o ip configurado pelo axios está indicado para a máquina que foi desenvolvida) que são:

	Na pasta de Views:	Card.js, linha 57
				Dessert.js, linha 18
				Drinks.js, linha 18
				Finish.js, linha 43 e linha 109
				Home.js, linha 32
				Login.js, linha 25
				Meet.js, linha 18
				Pasta.js, linha 18
				Salad.js, linha 18

Ajeitando as urls com os devidos IPs corretos e com o back rodando (separadamente), o front deve rodar sem problemas.
				