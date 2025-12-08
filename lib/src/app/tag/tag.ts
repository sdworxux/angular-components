import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import {  IgTagSize, IgTagColor } from './tag.enum';

@Component({
  selector: 'ig-tag',
  template: `
    @if (avatar()) {
      <span class="ig-avatar">
        <img [src]="avatar()" alt="avatar image" />
      </span>
    }
    @if (icon()) {
      <i [class]="icon()"></i>
    }
    <ng-content />
    @if (removable()) {
      <button
        type="button"
        [aria-label]="'Remove'"
        class="ig-btn-close"
        (click)="onRemove($event)"
      ></button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[class.ig-tag--fade]': 'hide()',
    '[attr.id]': '123',
  },
})

export class IgTagComponent {
  hide = signal(false);

  // inputs
  size = input<`${IgTagSize}`>(IgTagSize.Medium);
  color = input<`${IgTagColor}`>(IgTagColor.Gray);
  subtle = input(false, { transform: booleanAttribute });
  removable = input(false, { transform: booleanAttribute });
  icon = input('');
  avatar = input('');

  classes = computed(() => {
    const baseClass = 'ig-tag';
    const modifiers = [this.size(), this.color(), this.subtle() ? 'subtle' : 'bold'].map(
      (mod) => `${baseClass}--${mod}`,
    );
    return [baseClass, 'tag', ...modifiers].join(' ');
  });

  // outputs
  removed = output<MouseEvent>();

  // output handlers
  onRemove(e: MouseEvent) {
    this.removed.emit(e);
    this.hide.set(true);
  }
}

//   export enum IgTagColor {
//   Gray = 'gray',
//   Info = 'info',
//   Danger = 'danger',
//   Success = 'success',
//   Warning = 'warning',
//   Accent01 = 'accent-01',
//   Accent02 = 'accent-02',
//   Accent03 = 'accent-03',
//   Accent04 = 'accent-04',
//   Accent05 = 'accent-05',
//   Accent06 = 'accent-06',
//   Accent07 = 'accent-07',
//   Accent08 = 'accent-08',
//   Accent09 = 'accent-09',
//   Accent10 = 'accent-10',
//   Accent11 = 'accent-11',
//   Accent12 = 'accent-12',
// }
