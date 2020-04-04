import { Component, OnInit } from "@angular/core";
import { ProjelerService } from "../../../services/projeler/projeler.service";
import { MatSnackBar } from "@angular/material";
import { IProje } from "../../../models/projeler/projeler.model";
import { ActivatedRoute, Router } from "@angular/router";
import { map, concatMap } from "rxjs/operators";

@Component({
  selector: "app-delete-project",
  templateUrl: "./delete-project.component.html",
  styleUrls: ["./delete-project.component.css"],
})
export class DeleteProjectComponent implements OnInit {
  public proje: IProje;

  constructor(
    private _snackBar: MatSnackBar,
    private projectService: ProjelerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((res) => res.id),
        concatMap((id) => this.projectService.getProjectById(id)),
        map((res) => res.result)
      )
      .subscribe((proje) => {
        this.proje = proje;
      });
  }

  handleDelete() {
    this.projectService.deleteProject(this.proje.id).subscribe(
      (res) => {
        if (!res.hasError) {
          this.router.navigate(["/projects", "all-projects"]);
          this._snackBar.open("Proje Silme Başarılı.", "Kapat", {
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
  }
}
