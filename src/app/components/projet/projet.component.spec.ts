import { Component, OnInit } from '@angular/core';
import { ProjetService } from './projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: any[] = [];
  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit() {
    this.projetService.getAll().subscribe((data: any) => this.projets = data);
  }

  detailProjet(id: number) {
    this.router.navigate(['admin', 'projets', id]);
  }
}
