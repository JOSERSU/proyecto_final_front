import { Component, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReviewsServiceService } from '../services/reviews-service.service';
import { FormsModule } from '@angular/forms';
import { Review } from '../data/reviews';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-review',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './editar-review.component.html',
  styleUrl: './editar-review.component.css'
})
export class EditarReviewComponent {
  review: Review | null = null;
  reviewId: string | null;
  user: string = '';

  // Inyección del servicio en el constructor
  constructor(private reviewsService: ReviewsServiceService, private route: ActivatedRoute, private router: Router) {
    //this.CargarReviews(); // Cargar los héroes al inicializar el componente
    this.reviewId = this.route.snapshot.queryParamMap.get('id');
    if (this.reviewId != null) {
      this.datosAActualizar(+this.reviewId)
    }

  }

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
    this.reviewId = this.route.snapshot.queryParamMap.get('id');
    if (this.reviewId != null) {
      this.datosAActualizar(+this.reviewId)
    }
  }

  listadoReviews: any[] = [];
  product_id_review: Number = 0;
  review_text_review: string = '';
  rating_review: Number = 0;
  review_date_review: string = ''



  datosAActualizar(id: number): void {
    this.reviewsService.getReview(id).subscribe(
      (data) => {
        this.review = data;  // Asignamos los datos recibidos a la propiedad `review`
        console.info('Reviews cargados actualzar:', data);
        this.product_id_review = this.review.product_id
        this.review_text_review = this.review.review_text
        this.rating_review = this.review.rating
        this.review_date_review = this.review.review_date
      },
      (error) => {
        console.error('Error al obtener la revisión:', error);  // Manejo de errores
      }
    );
  }


  // Método para actualizar un héroe
  ActualizarReview() {
    this.modificarHijo()
    if (this.product_id_review === 0 || this.review_text_review === '' || this.rating_review === 0 || this.review_date_review === '' || this.user === '') {
      alert("Por favor, ingrese todos los campos.");
      return;
    }

    const revoewActualizado = {
      product_id: this.product_id_review,
      review_text: this.review_text_review,
      rating: this.rating_review,
      review_date: this.review_date_review,
      user: this.user
    };

    // Llamamos al servicio para actualizar el héroe
    if (this.reviewId != null) {



      this.reviewsService.putReview(+this.reviewId, revoewActualizado).subscribe(
        (data) => {
          console.info("Review actualizado:", data);
          alert("Review actualizado exitosamente");
          //this.CargarReviews(); // Recargar los héroes después de la actualización
        },
        (error) => {
          console.error("Error al actualizar el Review", error);
          alert("Hubo un error al actualizar el Review. Intente nuevamente.");
        }
      );
    }

  }

}
