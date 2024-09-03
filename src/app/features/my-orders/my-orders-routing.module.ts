import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersComponent } from '@features/my-orders/pages';

const routes: Routes = [
  {
    path: '',
    component: MyOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersRoutingModule {}
