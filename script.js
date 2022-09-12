var app = new (function () {
  this.el = document.getElementById('countries')

  document.getElementById('spoiler').style.display = 'none' //Vai esconder o modal ao iniciar o projeto

  this.countries = []

  this.Count = function (data) {
    var el = document.getElementById('counter')
    var name = 'país'

    if (data) {
      if (data > 1) {
        name = 'países'
      }
      el.innerHTML = data + ' ' + name
    } else {
      el.innerHTML = 'Nenhum ' + name + ' favoritado!'
    }
  }

  // Caregar a lista de paises
  this.FetchAll = function () {
    var data = ''

    if (this.countries.length > 0) {
      for (i = 0; i < this.countries.length; i++) {
        data += '<tr>'
        data += '<td>' + this.countries[i] + '</td>'
        data += '<td><button onclick="app.Edit(' + i + ')">Editar</button></td>'
        data +=
          '<td><button onclick="app.Delete(' + i + ')">Deletar</button></td>'
        data += '</tr>'
      }
    }
    this.Count(this.countries.length)

    return (this.el.innerHTML = data)
  }

  this.Add = function () {
    el = document.getElementById('add-name')
    //Pega o valor
    var country = el.value

    if (country) {
      // Adiciona o novo valor
      this.countries.push(country.trim())
      //Redefinir valor de entrada
      el.value = ''
      // Mostra a nova lista
      this.FetchAll()
    }
  }

  this.Edit = function (item) {
    var el = document.getElementById('edit-name')
    // Exibe o valor no campo
    el.value = this.countries[item]
    // Mostra os campos
    document.getElementById('spoiler').style.display = 'block'
    self = this

    document.getElementById('saveEdit').onsubmit = function () {
      // Obter valor
      var country = el.value

      if (country) {
        self.countries.splice(item, 1, country.trim())

        self.FetchAll()

        CloseInput()
      }
    }
  }

  this.Delete = function (item) {
    const isOk = confirm(
      `Tem certeza que deseja deletar o pais ${this.countries[item]}?`
    )
    if (isOk) {
      //Se retornar verdadeiro o confirm a linha é excluida
      this.countries.splice(item, 1)
    }
    this.FetchAll()
  }
})()

app.FetchAll()

function CloseInput() {
  document.getElementById('spoiler').style.display = 'none'
}
