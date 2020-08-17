import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';

const routes: Routes = [
  { path: '', component: FormCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
