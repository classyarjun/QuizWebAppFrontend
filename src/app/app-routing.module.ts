import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestReadmeComponent } from './test-readme/test-readme.component';
import { QuizTestComponent } from './quiz-test/quiz-test.component';
import { TestingComponent } from './testing/testing.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'test-readme', component:TestReadmeComponent },
  { path: 'quiz-test', component:QuizTestComponent },
  { path: 'adminlogin', component:AdminloginComponent },
  { path: 'admin-dashboard', component:AdminDashboardComponent},
  { path: 'testing', component:TestingComponent },
];

@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

