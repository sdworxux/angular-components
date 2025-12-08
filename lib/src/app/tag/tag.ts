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