import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentlyAddedComponent } from './pages/recently-added/recently-added.component';
import { GoComponent } from './pages/go/go.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recently-added', pathMatch: 'full' },
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
