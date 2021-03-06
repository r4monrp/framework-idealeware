import { Component, OnInit, AfterContentChecked, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { equalsValidator } from "../../../directives/equals/equals.directive";
import { validEmail } from "../../../directives/email-validator/email-validator.directive";
import { CustomerService } from "../../../services/customer.service";
import { Router } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'app-forget-password',
    templateUrl: '../../../template/register/forget-password/forget-password.html',
    styleUrls: ['../../../template/register/forget-password/forget-password.scss'],
})
export class ForgetPasswordComponent implements OnInit {

    public email: string;
    confirmEmail: string;
    cpf_cnpj: string;

    formRecoverPassword: FormGroup;

    constructor(
        private titleService: Title,
        private service: CustomerService,
        private parentRouter: Router,
        builder: FormBuilder,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
        this.formRecoverPassword = builder.group({
            email: ['', Validators.compose([
                Validators.required,
                validEmail()
            ])],
            confirmEmail: ['', Validators.compose([
                Validators.required,
                validEmail(),
                equalsValidator(this.email)

            ])],
            cpf_cnpj: ['', Validators.required]
        });

    }

    ngOnInit() {
        this.titleService.setTitle('Recuperar Senha');
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    recoverPassword(event) {
        if (isPlatformBrowser(this.platformId)) {
            event.preventDefault();

            if (this.formRecoverPassword.invalid) {
                for (let i in this.formRecoverPassword.controls) {
                    (<any>this.formRecoverPassword.controls[i])._touched = true;
                }

                swal({
                    title: 'Erro ao solicitar recuperação de senha',
                    text: 'Verifique se todos os campos foram preenchidos corretamente',
                    type: 'error',
                    confirmButtonText: 'OK'
                });
            }
            else {
                this.service.recoverPassword(this.cpf_cnpj, this.email)
                    .then(response => {
                        swal({
                            title: 'Solicitação Enviada!',
                            text: 'Um e-mail contendo informações para a recuperação de senha foi enviado para você',
                            type: 'success',
                            confirmButtonText: 'OK'
                        });
                        this.parentRouter.navigateByUrl('/');

                    })
                    .catch(error => {
                        swal({
                            title: 'Erro ao solicitar recuperação de senha',
                            text: error.text(),
                            type: 'error',
                            confirmButtonText: 'OK'
                        });

                        console.log(error);
                    })
            }
        }
    }

    /* Validators */
    fieldIsBlank(field: string): boolean {
        if (!this.formRecoverPassword.controls[field].untouched && this.formRecoverPassword.controls[field].errors)
            if (this.formRecoverPassword.controls[field].errors['required'])
                return true;

        return false;
    }

    invalidEmail(field: string): boolean {
        if (!this.formRecoverPassword.controls[field].untouched && this.formRecoverPassword.controls[field].errors)
            if (this.formRecoverPassword.controls[field].errors['invalidEmail'])
                return true;

        return false;
    }

    emailNotConfirmed(): boolean {
        if (!this.formRecoverPassword.controls['confirmEmail'].untouched && this.formRecoverPassword.controls['confirmEmail'].errors)
            if (this.formRecoverPassword.controls['confirmEmail'].errors['equalsTo'])
                return true;

        return false;
    }

    hasError(key: string): boolean {
        return (this.formRecoverPassword.controls[key].touched && this.formRecoverPassword.controls[key].invalid);
    }
}