import { FeatherPipe } from './feather.pipe';
import { ɵDomSanitizerImpl } from '@angular/platform-browser';

describe('FeatherPipe', () => {
    it('create an instance', () => {
        const sanitizer = new ɵDomSanitizerImpl(null);
        const pipe = new FeatherPipe(sanitizer);

        expect(pipe).toBeTruthy();
    });
});
