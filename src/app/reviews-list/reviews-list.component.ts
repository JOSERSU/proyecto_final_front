import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewsServiceService } from '../services/reviews-service.service';
import { HeaderComponent } from "../header/header.component";
import { Review } from '../data/reviews';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  imports: [FormsModule, HeaderComponent, RouterLink],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {

  review: Review | null = null;
  user: string = '';

  @ViewChild(HeaderComponent) hijo!: HeaderComponent;

  modificarHijo() {
    // Accediendo a la variable del hijo
    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
  }

  ngOnInit(): void {
    console.log('Componente ReviewsList cargado correctamente');
    this.CargarReviews();
  }

  listadoReviews: any[] = [];
  product_id_review: Number = 0;
  review_text_review: string = '';
  rating_review: Number = 0;
  review_date_review: string = ''

  // Inyección del servicio en el constructor
  constructor(private reviewsService: ReviewsServiceService, private router: Router) {
    this.CargarReviews(); // Cargar los héroes al inicializar el componente
  }

  // Método para cargar los héroes
  CargarReviews() {
    this.reviewsService.getAllReviews().subscribe(
      (data: any[]) => { // Asegúrate de que `data` sea un array de objetos
        // Filtra los reviews según el usuario actual
        //console.log(this.user)
        this.user = this.hijo.actualizarVariable();
        console.log('Usuario', this.user);
        this.listadoReviews = data.filter(review => review.user === this.user);

        console.info('Reviews cargados y filtrados:', this.listadoReviews);
        //console.log(this.usuario)
      },
      (error) => {
        console.error("Error al cargar los Reviews", error);
        this.listadoReviews = []; // Limpiar en caso de error
      }
    );
  }

  // Método para eliminar un héroe
  EliminarReview(id: number) {
    this.reviewsService.deleteReview(id).subscribe(
      () => {
        this.CargarReviews(); // Recargar la lista de héroes después de eliminar
      },
      (error) => {
        console.error("Error al eliminar el review", error);
      }
    );
  }

}
