# MODEL

## Validações e observações para (`UserModel.js`)

- PRORIEDADE `defautValue` com seu valor vazio/`empty`(''), é utilizado para podermos gerar um erro caso o mesmo não for enviado, que será analizado pelo `validator`.

- O ATTRIBUTE `password_hash` é um **campo da tabela dentro do DB(banco de dados) criado pela migração**, e nele apenas consta a PROPRIEDADE `defaultValue: ''` para geração de erro, caso seu valor não seja passado.

> O attibute `password_hash` recebe seu valor do campo `password` um campo **VIRTUAL**, criado só aqui em **MODEL**.

- O ATTRIBUTE `password` é uma PROPRIEDADE `VIRTUAL` criada apenas dentro do **MODEL**, referênciando as validações e os valores que serão repassados ao attibute `password_hash`.

- `BCRYPTJS` é o componente que criar o **hash** do password referênciado.

> **BCRYPTJS** é executado no **MODEL** por um `HOOK` preconfigurado.

---

### Hook explicação (`UserModel.js`)

`Hook` é uma função que permite conectar-se a recursos do sistema/framework em pontos específicos da execução do código.

**Detalhamento do `HOOK` utilizado para o componente `bcryptJS`**

```js
this.addHook('beforeSave', async (user) => {
  user.password_hash = await bcrypt.hash(user.password, 8);
});
```

#### **Explicação:**

- `this.addhook()`
  - Função que ativa o `hook`

- `beforeSave`
  - first assignment(primeira atribuição) = executar o bloco de command de dentro da função antes de salvar o MODEL no DB.

- `async user`
  - é umafunção anonima (anonymous function), que recebe como argumento o **user** (criado) para utilização e reatribuição de valores aos seus atributos;
    </br>

---

### JWT - Json Web Token

`JWT` é um padrão aberto usado para autenticação e troca segura de informações entre um cliente(navegador/app) e um servidor.

**Em resumo:** É um token em formato JSON, compacto e seguro.

- Usado principalmente para autenticação e autorização
- Pode ser enviado em requisições HTTP (geralmente no header Authorization).

#### Modos de enviar **TOKEN** via Insomnia

- **header** (authorization ) --> Bearer eyJhbG..... (token)

- **Bearer** --> eyJhbG..... (token)
  </br>

---

### UPLOAD files (framework multer)

`npm install multer`

#### Modos de enviar **Photo** via Insomnia

- **Body** (form data ) --> name para o campo

- **file** (choose file) --> selecionar arquivo clicando em cima.
  </br>
