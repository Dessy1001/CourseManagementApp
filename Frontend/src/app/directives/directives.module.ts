import { NgModule } from '@angular/core';

import { NumbersOnlyDirective } from './numbers-only.directive';
import { LettersOnlyDirective } from './letters-only.directive';


@NgModule({
declarations: [ NumbersOnlyDirective, LettersOnlyDirective ],
exports: [ NumbersOnlyDirective, LettersOnlyDirective ]
})

export class DirectivesModule { }
