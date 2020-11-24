import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cancel-promise';
  count = 0;
  msg: string;
  during: any;

  counting(){
    let finished = false;
    let cancel: any = () => finished =true ;
    this.msg = '';
    const promise = new Promise((resolve, reject) => {
      this.count = 0;
      const id = setInterval(() => {
        this.count += 1;
        if (this.count >= 5) {
          finished = true;
          clearInterval(id);
          resolve("Ready or not");
        }
      }, 1000);

      cancel = () => {
        if (finished) {
          return;
        }
        clearInterval(id);
        resolve("OK, I\'ll stop counting.");
      };
    });

    return { promise, cancel };
  }

  async startCounting() {
     this.during  = this.counting();
     this.msg = await this.during.promise;
  }

  async cancelCounting() {
    if(this.during){
      this.during.cancel();
    }
  }
  



  ngOnInit(){}

}
