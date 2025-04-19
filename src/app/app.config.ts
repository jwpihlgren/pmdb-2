import { ApplicationConfig, EnvironmentInjector, inject, InjectionToken, provideAppInitializer, provideZoneChangeDetection, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ImageLoaderConfig, IMAGE_LOADER, ImageLoader, APP_BASE_HREF } from '@angular/common';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService } from './shared/services/config.service';
import { ImageService } from './shared/services/image.service';
import { environment } from '../environments/environment';

interface ImageConfig {
    backdrop: string,
    logo: string,
    poster: string,
    profile: string,
    still: string

}

export const IMAGE_CONFIG = new InjectionToken<ImageConfig>('app.config image')

function customImageLoaderFactory(): ImageLoader {
    const imageService = inject(ImageService)
    return (config: ImageLoaderConfig): string => {
        const loaderParams = config.loaderParams
        const type: string | undefined = loaderParams ? loaderParams['type'] : undefined
        return imageService.getUrl(config.src, config.width, type)
    }
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([])),
        provideAppInitializer(() => {
            const service = inject(ConfigService)
            return service.initialize()
        }),
        {
            provide: IMAGE_LOADER,
            useFactory: customImageLoaderFactory,
            deps: [ImageService]
        },
    ]
};
