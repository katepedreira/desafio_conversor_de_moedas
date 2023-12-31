import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ConversorMoedasComponent } from './conversor-moedas/conversor-moedas/conversor-moedas.component';
import { HistoricoConversoesComponent } from './historico-conversoes/historico-conversoes/historico-conversoes.component';
import { ListaMoedasComponent } from './lista-moedas/lista-moedas/lista-moedas.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: "", redirectTo: 'home', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "principal", component: PrincipalComponent},
  {path: "conversor-moedas", component: ConversorMoedasComponent},
  {path: "historico-conversoes", component: HistoricoConversoesComponent},
  {path: "lista-moedas", component: ListaMoedasComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
