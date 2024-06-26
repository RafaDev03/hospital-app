import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchesService } from '../../../services/searches.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSub?: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    private modalService: ModalService
  ) {}
  ngOnDestroy(): void {
    this.imgSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.findUsers();
    this.imgSub = this.modalService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.findUsers());
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsers) {
      this.desde -= valor;
    }
    this.findUsers();
  }

  findUsers() {
    this.cargando = true;
    this.userService.findUsers(this.desde).subscribe((res: any) => {
      this.totalUsers = res.count;
      this.users = res.users;
      this.usersTemp = res.users;
      this.cargando = false;
    });
  }

  deleteUser(user: User) {
    if (user.id === this.userService.user?.id) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: 'Delete User?',
      text: `Are you sure to delete the user : ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsers(user.id!).subscribe((res: any) => {
          if (res.ok) {
            Swal.fire({
              title: 'Deleted!',
              text: res.msg,
              icon: 'success',
            });
            this.findUsers();
          }
        });
      }
    });
    return;
  }

  updateUser(user: User) {}
  search(termino: string): any {
    if (termino.length === 0) {
      return (this.users = this.usersTemp);
    }
    this.searchService.search('users', termino).subscribe((res: any) => {
      this.users = res;
      console.log(res);
    });
  }

  updateRole(user: User) {
    this.userService.saveUser(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  openModal(user: User) {
    this.modalService.openModal('users', user);
  }
}
