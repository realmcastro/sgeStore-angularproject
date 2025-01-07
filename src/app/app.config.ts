import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
    providers: [
       
        BrowserAnimationsModule,
        provideAnimationsAsync(),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([AuthInterceptor]))
    ]
};