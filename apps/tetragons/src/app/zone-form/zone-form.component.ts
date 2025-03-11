import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ZoneData } from '@tetragons/shared';
import { expectedRangeX, expectedRangeY } from '../canvas.utils';

const defaultPointValue = { x: 0, y: 0 };
const defaultFormValue = {
  name: '',
  pointA: defaultPointValue,
  pointB: defaultPointValue,
  pointC: defaultPointValue,
  pointD: defaultPointValue,
};

@Component({
  selector: 'app-zone-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zone-form.component.html',
  styleUrl: './zone-form.component.scss',
})
export class ZoneFormComponent {
  public readonly createZone = output<ZoneData>();

  public readonly zoneForm = new FormGroup(
    {
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-zA-Z 0-9]+'),
          Validators.maxLength(10),
        ],
        nonNullable: true,
      }),
      pointA: this.newPointFormGroup(),
      pointB: this.newPointFormGroup(),
      pointC: this.newPointFormGroup(),
      pointD: this.newPointFormGroup(),
    },
    { validators: uniquePointsValidator }
  );

  public onSubmit() {
    if (!this.zoneForm.valid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    const { name, pointA, pointB, pointC, pointD } =
      this.zoneForm.getRawValue();

    this.createZone.emit({
      name: name.trim(),
      points: [
        [pointA.x, pointA.y],
        [pointB.x, pointB.y],
        [pointC.x, pointC.y],
        [pointD.x, pointD.y],
      ],
    });

    this.zoneForm.reset(defaultFormValue);
  }

  public getPointErrors(
    group: FormGroup<{ x: FormControl<number>; y: FormControl<number> }>
  ): string[] {
    const errors: string[] = [];

    if (
      group.controls.x.hasError('required') ||
      group.controls.y.hasError('required')
    ) {
      errors.push('Point coordinates are required');
    }

    if (group.controls.x.hasError('min') || group.controls.x.hasError('max')) {
      errors.push(
        `x coordinate must be between ${-expectedRangeX} and ${expectedRangeX}`
      );
    }

    if (group.controls.y.hasError('min') || group.controls.y.hasError('max')) {
      errors.push(
        `y coordinate must be between ${-expectedRangeY} and ${expectedRangeY}`
      );
    }

    return errors;
  }

  private newPointFormGroup() {
    return new FormGroup({
      x: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(-expectedRangeX),
          Validators.max(expectedRangeX),
        ],
        nonNullable: true,
      }),
      y: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(-expectedRangeY),
          Validators.max(expectedRangeY),
        ],
        nonNullable: true,
      }),
    });
  }
}

const uniquePointsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { pointA, pointB, pointC, pointD } = control.value;

  const pointValues = [pointA, pointB, pointC, pointD];
  const uniquePointValues = new Set(
    pointValues.map((one) => JSON.stringify(one))
  );

  return pointValues.length != uniquePointValues.size
    ? { uniquePoints: true }
    : null;
};
