import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  model;
  prediction = 0;


  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    this.model = await tf.loadLayersModel('/assets/model/model.json');
  }

  async predict(num1: string, num2: string) {
    const pred = await tf.tidy(() => {

      // Parse the input to float and create a 2d tensor with a shape of 1 * 2
      const tensor = tf.tensor2d([parseFloat(num1), parseFloat(num2)], [1, 2]);
      // Make and format the predications

      const output = this.model.predict(tensor) as any;
      // Save predictions on the component
      this.prediction = output.dataSync();
    });
  }

}
