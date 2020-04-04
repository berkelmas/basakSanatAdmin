import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { AtolyeService } from "../../../services/atolyeler/atolye.service";
import { IAtolye } from "../../../models/atolye/atolye.model";
import { map, concatMap } from "rxjs/operators";

@Component({
  selector: "app-update-atolye",
  templateUrl: "./update-atolye.component.html",
  styleUrls: ["./update-atolye.component.css"],
})
export class UpdateAtolyeComponent implements OnInit {
  public itemForm: FormGroup;
  public atolye: IAtolye;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private atolyeService: AtolyeService
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map((res) => res.id),
        concatMap((id) => this.atolyeService.getAtolyeById(id)),
        map((res) => res.result)
      )
      .subscribe((atolye) => {
        this.atolye = atolye;
        this.itemForm.patchValue({
          title: atolye.title,
          date: atolye.date,
          description: atolye.description,
        });
      });
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      this.atolyeService
        .updateAtolye(
          this.atolye.id,
          this.itemForm.value.title,
          this.itemForm.value.description,
          this.itemForm.value.date
        )
        .subscribe(
          (res) => {
            if (!res.hasError) {
              this.router.navigate(["/workshops", "all-workshops"]);
              this._snackBar.open("Atölye Düzenleme Başarılı.", "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
            } else {
              this._snackBar.open(res.message, "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
            }
          },
          (err) =>
            this._snackBar.open("Beklenmedik Hata Meydana Geldi.", "Kapat", {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            })
        );
    } else {
      this._snackBar.open("Geçerli Form Girmeniz Gerekmektedir.", "Kapat", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }
}
