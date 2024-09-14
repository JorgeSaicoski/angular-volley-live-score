import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Match } from '@interfaces/match';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButton,
        
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  dialogRef = inject(MatDialogRef<CreateComponent>)
  matchForm: FormGroup
  constructor(private fb: FormBuilder){
    this.matchForm = this.fb.group({
      matchDate: [''],
      adversary: ['']
    })
  }

  createMatch(){
    if (this.matchForm.valid){
      const match: Partial<Match> = this.matchForm.value
      this.dialogRef.close(match)
      console.log("send")
    }
  }
  onCancel(){
    this.dialogRef.close(null)
  }

}
