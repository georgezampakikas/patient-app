import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'patients', 
        loadComponent: () => import('./components/patients/patients').then(m => m.Patients), 
    },
    {
        path: 'patient-details/:id',
        loadComponent: () => import('./components/patient-details/patient-details').then(m => m.PatientDetails),
    },
    { 
        path: 'new-patients', 
        loadComponent: () => import('./components/page/page').then(m => m.Page), 
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings').then(m => m.Settings)
    },
    { path: '**', redirectTo: 'patients' }
];
