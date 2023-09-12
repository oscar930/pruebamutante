import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'prueba-proyecto-mutante';
  secuenciadna: string = '';
  myForm: FormGroup;
  mutante: boolean = false;
  nomutante: boolean = false;
  valorretorno: boolean = false;
  ingresoavalidar: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      miTextarea: new FormControl('', [
        Validators.required, // Campo requerido
        Validators.pattern(/^[ACGTacgt\n]+$/), // Patrón para permitir solo A, C, G, T y saltos de línea
      ]),
    });
  }

  detectarmutante() {
    let valor = this.myForm.value.miTextarea;
    let variable = valor.split('\n').map((line: string) => line.trim());
    let valorcapacidad=variable.length;
    let contador=0;

    for (let i = 0; i < variable.length; i++) {

      if(variable[i].length!=variable.length){
        contador=contador+1;
      }

    }

    if(valor=="" || contador !=0 || valorcapacidad <4){

      this._snackBar.open('Campo vacio o vector incongruente NXN', 'Mutantes', {
        duration: 3500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    });

    }else{
      this.isMutant(valor);
    }
    
  }

  isMutant(dna: any) {
    this.ingresoavalidar=true;
    let dnaArray = dna.split;
    let contador = 0;
    const variable = dna.split('\n').map((line: string) => line.trim());
    const sequencesToCheck = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];


    for (let i = 0; i < variable.length; i++) {
      // Verificar horizontalmente
      for (const sequence of sequencesToCheck) {

        if (variable[i].includes(sequence)) {
          contador = contador + 1;
        }
      }

      // Verificar verticalmente
      let verticalSequence = '';
      for (let k = 0; k < variable.length; k++) {
        verticalSequence += variable[k][i];
      }

      for (const sequence of sequencesToCheck) {
        if (verticalSequence.includes(sequence)) {
          contador = contador + 1;
        }
      }

      // Verificar diagonalmente (de izquierda a derecha)
      let diagonalSequence = '';
      for (let k = 0; k < variable.length; k++) {
        if (i + k < variable.length && i + k < variable[i].length) {
          diagonalSequence += variable[i + k][i + k];
        }
      }
      for (const sequence of sequencesToCheck) {
        if (diagonalSequence.includes(sequence)) {
          contador = contador + 1;
        }
      }

        // Verificar diagonalmente (de derecha a izquierda)
        let antiDiagonalSequence = '';
        for (let k = 0; k < variable.length; k++) {
          if (i + k < variable.length && i - k >= 0) {
            antiDiagonalSequence += variable[i + k][i - k];
          }
        }
        for (const sequence of sequencesToCheck) {
          if (antiDiagonalSequence.includes(sequence)) {
            contador = contador + 1;
          }
        }


    }

    if(contador>=2){

      this.mutante=true;

    }

  }

}
