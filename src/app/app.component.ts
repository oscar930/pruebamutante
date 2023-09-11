import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-proyecto-mutante';
  secuenciadna: string ='';
  myForm:FormGroup;
  mutante: boolean = false;
  nomutante: boolean = false;

  dnaFormControl = new FormControl('', [
    Validators.required, // Campo requerido
    Validators.pattern(/^[ACGTacgt\n]+$/), // Patrón para permitir solo A, C, G, T y saltos de línea
  ]);

  constructor(private router: Router,private fb: FormBuilder){

    this.myForm= this.fb.group({
          'miTextarea': new FormControl('', [
            Validators.required, // Campo requerido
            Validators.pattern(/^[ACGTacgt\n]+$/), // Patrón para permitir solo A, C, G, T y saltos de línea
          ])
    });

  }

  detectarmutante(){

    let valor = this.myForm.value.miTextarea;
    this.isMutant(valor);
    this.mutante

  }


  isMutant(dna: any) {
    const sequencesToCheck = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];
  
    for (let i = 0; i < dna.length; i++) {
      for (let j = 0; j < dna[i].length; j++) {
        // Verificar horizontalmente
        for (const sequence of sequencesToCheck) {
          if (dna[i].includes(sequence)) {
            return true;
          }
        }
  
        // Verificar verticalmente
        let verticalSequence = '';
        for (let k = 0; k < dna.length; k++) {
          verticalSequence += dna[k][j];
        }
        for (const sequence of sequencesToCheck) {
          if (verticalSequence.includes(sequence)) {
            return true;
          }
        }
  
        // Verificar diagonalmente (de izquierda a derecha)
        let diagonalSequence = '';
        for (let k = 0; k < dna.length; k++) {
          if (i + k < dna.length && j + k < dna[i].length) {
            diagonalSequence += dna[i + k][j + k];
          }
        }
        for (const sequence of sequencesToCheck) {
          if (diagonalSequence.includes(sequence)) {
            return true;
          }
        }
  
        // Verificar diagonalmente (de derecha a izquierda)
        let antiDiagonalSequence = '';
        for (let k = 0; k < dna.length; k++) {
          if (i + k < dna.length && j - k >= 0) {
            antiDiagonalSequence += dna[i + k][j - k];
          }
        }
        for (const sequence of sequencesToCheck) {
          if (antiDiagonalSequence.includes(sequence)) {
            return true;
          }
        }
      }
    }
  
    return false;
  }



}
