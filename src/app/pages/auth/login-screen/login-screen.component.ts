import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/reducers/index.reducer";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  selectloginLoading,
  selectloginFailed
} from "../../../store/selectors/user.selectors";
import { StartLoginAction } from "../../../store/actions/user.actions";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login-screen.component.html",
  styleUrls: ["./login-screen.component.css"]
})
export class LoginScreenComponent implements OnInit {
  public form: FormGroup;
  public loading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.loading$ = this.store.select(selectloginLoading);
    this.store.select(selectloginFailed).subscribe(res => {
      if (res) {
        this._snackBar.open("Giriş Başarısız.", "Kapat", { duration: 2000 });
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      new StartLoginAction({
        username: this.form.value.uname,
        password: this.form.value.password
      })
    );
    // console.log(this.form.value);
    // this.router.navigate(["/dashboards/dashboard1"]);
  }
}
