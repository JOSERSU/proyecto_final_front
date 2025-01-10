import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReviewsListComponent } from '../reviews-list/reviews-list.component';
import { ReviewsServiceService } from '../services/reviews-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-review',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './nueva-review.component.html',
  styleUrl: './nueva-review.component.css'
})
export class NuevaReviewComponent {

  user: string = '';

  @ViewChild(HeaderComponent) hijo!: HeaderComponent;

  modificarHijo() {
    // Accediendo a la variable del hijo
    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
  }


  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes es 0-11, por eso sumamos 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Formato "2024-11-29T15:34:07.483"
    return `${day}/${month}/${year}`;
  }

  getCurrentDateTimeG(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes es 0-11, por eso sumamos 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Formato "2024-11-29T15:34:07.483"
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  ngOnInit(): void {
    console.log('Componente ReviewsList cargado correctamente');
    this.review_date_review = this.getCurrentDateTimeG()
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
      (data) => {
        this.listadoReviews = data; // Asignamos los héroes
        console.info('Reviews cargados:', data);
        console.log('Reviews en la variable reviews:', this.listadoReviews);  // Verifica la variable
      },
      (error) => {
        console.error("Error al cargar los Reviews", error);
        this.listadoReviews = []; // Limpiar en caso de error
      }
    );
  }

  // Método para crear un nuevo héroe
  CrearReview() {
    if (this.product_id_review === 0 || this.review_text_review === '' || this.rating_review === 0 || this.review_date_review === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    this.user = this.hijo.actualizarVariable();
    console.log('Usuario', this.user);
    const review = {
      product_id: this.product_id_review,
      review_text: this.review_text_review,
      rating: this.rating_review,
      review_date: this.review_date_review,
      user: this.user
    };
    // Llamamos al servicio para crear el héroe
    this.reviewsService.postReview(review).subscribe(
      (data) => {
        console.info("Review creado:", data);
        alert("Review creado exitosamente");
        //this.CargarReviews(); // Recargar
      },
      (error) => {
        console.error("Error al crear el review", error);
        alert("Hubo un error al crear el review. Intente nuevamente.");
      }
    );
  }


  // Método para actualizar un héroe
  ActualizarReview(id: number) {
    if (this.product_id_review === 0 || this.review_text_review === '' || this.rating_review === 0 || this.review_date_review === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    const revoewActualizado = {
      product_id: this.product_id_review,
      review_text: this.review_text_review,
      rating: this.rating_review,
      review_date: this.review_date_review,
      user: HeaderComponent.currentUser.username
    };

    // Llamamos al servicio para actualizar el héroe
    this.reviewsService.putReview(id, revoewActualizado).subscribe(
      (data) => {
        console.info("Review actualizado:", data);
        alert("Review actualizado exitosamente");
        this.CargarReviews(); // Recargar los héroes después de la actualización
      },
      (error) => {
        console.error("Error al actualizar el Review", error);
        alert("Hubo un error al actualizar el Review. Intente nuevamente.");
      }
    );
  }

}
