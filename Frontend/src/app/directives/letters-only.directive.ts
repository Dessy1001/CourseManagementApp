import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
selector: '[appLettersOnly]'
})

export class LettersOnlyDirective {
constructor(private element: ElementRef) { }

@HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initialValue.replace(/[^a-zA-Z]*/g, '');

    if (initialValue !== this.element.nativeElement.value) {
        event.stopPropagation();
    }
  }
}