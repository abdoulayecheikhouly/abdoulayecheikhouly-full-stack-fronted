import { Component, OnInit } from '@angular/core';
import {Categorie} from "../model/categorie.model";
import {ProduitService} from "../services/produit.service";
import {Produit} from "../model/produit.model";

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrls: ['./liste-categories.component.css']
})
export class ListeCategoriesComponent implements OnInit {

  categories! : Categorie[];
  updatedCat:Categorie = {"idCat":0,"nomCat":""};
  cat!: Categorie;
  ajout:boolean=true;



  constructor(private produitService: ProduitService) {

    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  ngOnInit(): void {
  }

  categorieUpdated(cat: Categorie) {

    console.log("Cat updated event",cat);
    this.produitService.ajouterCategorie(cat).
    subscribe( ()=> this.chargerCategories());


  }

  private chargerCategories() {
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  updateCat(cat: Categorie) {

    this.updatedCat=cat;
    this.ajout=false;

  }

/*  deleteCat(cat: Categorie) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(cat.idCat).subscribe(() => {
        this.chargerCategories();

      });

  }*/

}
