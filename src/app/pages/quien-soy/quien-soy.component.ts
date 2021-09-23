import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

  githubData;

  constructor(private apiS: ApisService) {
    this.apiS.setUrl('https://api.github.com/users/Mazzu98');
    this.apiS.apiCall().subscribe((data)=>{
      this.githubData = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
  }

}
