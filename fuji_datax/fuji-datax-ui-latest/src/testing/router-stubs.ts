import { Directive, Input}    from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    @Input('queryParams') queryParams: any;
}