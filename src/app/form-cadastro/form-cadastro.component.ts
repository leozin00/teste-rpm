import { CepService} from './service/cep.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as cpfValidador from '@fnando/cpf';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss'],
})
export class FormCadastroComponent implements OnInit {

  generos = [
    'Masculino',
    'Feminino',
    'Outro',
    'Sem gênero'

  ];

  estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ];

  //Criação dos formulários e campos
  pessoaisForm = new FormGroup({
    cpf: new FormControl('', [
      Validators.required,
    ]),
    nome: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    confirmarEmail: new FormControl('', [
      Validators.required,
    ]),
    nascimento: new FormControl('', [
      Validators.required,
    ]),
    celular: new FormControl('', [
      Validators.required,
    ]),
    outroTelefone: new FormControl(''),
    genero: new FormControl('', [
      Validators.required,
    ]),
  })
  enderecoForm = new FormGroup({


    cep: new FormControl('', [
      Validators.required,
    ]),
    endereco: new FormControl('', [
      Validators.required,
    ]),
    cidade: new FormControl('', [
      Validators.required,
    ]),
    estado: new FormControl('', [
      Validators.required,
    ]),
    bairro: new FormControl('', [
      Validators.required,
    ]),
    numero: new FormControl('', [
      Validators.required,
    ]),
    complemento: new FormControl(''),


  });
  segurancaForm = new FormGroup({
    senha: new FormControl('', [
      Validators.required,
    ]),
    repitaSenha: new FormControl('', [
      Validators.required,
    ]),
    recaptchaReactive: new FormControl('', [
      Validators.required,
    ]),
    mensagens: new FormControl(''),
    termos: new FormControl('', [
      Validators.required,
    ])
  });

  get cpf() {return this.pessoaisForm.get('cpf'); }
  get nome() {return this.pessoaisForm.get('nome'); }
  get email() {return this.pessoaisForm.get('email'); }
  get confirmarEmail() {return this.pessoaisForm.get('confirmarEmail'); }
  get nascimento() {return this.pessoaisForm.get('nascimento'); }
  get celular() {return this.pessoaisForm.get('celular'); }
  get outroTelefone() {return this.pessoaisForm.get('outroTelefone'); }
  get genero() {return this.pessoaisForm.get('genero'); }
  get cep() {return this.enderecoForm.get('cep'); }
  get endereco() {return this.enderecoForm.get('endereco'); }
  get cidade() {return this.enderecoForm.get('cidade'); }
  get estado() {return this.enderecoForm.get('estado'); }
  get bairro() {return this.enderecoForm.get('bairro'); }
  get numero() {return this.enderecoForm.get('numero'); }
  get complemento() {return this.enderecoForm.get('complemento'); }
  get senha() {return this.segurancaForm.get('senha'); }
  get repitaSenha() {return this.segurancaForm.get('repitaSenha'); }
  get captcha() {return this.segurancaForm.get('captcha'); }
  get mensagens() {return this.segurancaForm.get('mensagens'); }
  get termos() {return this.segurancaForm.get('termos'); }

  constructor(private cepService: CepService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //Validação final
    if(this.email.value === this.confirmarEmail.value) {
      if(this.senha.value === this.repitaSenha.value) {
        if(cpfValidador.isValid(this.cpf.value)) {
          alert("Formulário válidado");
        }else {
          alert("CPF Invalido");
        }
      }else{
        alert("Erro na confirmação de senha, por favor reescreva os campos");
      }
    }else{
      alert("Erro na confirmação de email, por favor reescreva os campos");
    }
  }

  buscarCEP(cep) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.x
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.cepService.GetCep(cep).subscribe(dados =>{
          this.populaDadosForm(dados);
        });
      }
    }
  }

  populaDadosForm(dados) {
    //Recuperados dados da Api e colocar no formulário
    this.enderecoForm.setValue(
      {
        cep: dados.cep,
        endereco: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        numero: '',

      }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);

  }

  mostrarSenha(img, input){

    const olhoAberto = "../../assets/imagens/olho-aberto.png";
    const olhoFechado = "../../assets/imagens/olho-fechado.png";

    console.log(input);
    if(input.type == "password"){
      input.type = "text";
      img.src = olhoFechado;
    }else{
      input.type = "password";
      img.src = olhoAberto;
    }



  }


}
