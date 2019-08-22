import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchProfileService} from '@app/_services';
import {Profile} from '@app/_models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  prof: Profile[];
  rez: boolean;
  displayedColumns: string[] = ['img', 'fullname', 'info', 'git_url'];
  dataSource: MatTableDataSource<Profile>;
  lengs = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'C#', 'Shell',
    'Objective-C', 'Matlab', 'Arduino', 'R', 'VimL', 'Go', 'Perl', 'CoffeeScript', 'TeX', 'Swift',
    'Scala', 'Emacs Lips', 'Haskell', 'Lua', 'Clojure', 'Makefile', 'Groovy', 'Puppet', 'Rust', 'PowerShell'];
  bl: boolean[] = [false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false];
  updateddata: Profile[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private searchService: SearchProfileService, private toastr: ToastrService) {
    this.rez = false;
  }

  ngOnInit() {
    this.searchService.getAllResults().then(
        profiles => {
          this.prof = profiles;
          this.dataSource = new MatTableDataSource(this.prof);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.toastr.warning("The server doesn't respond");
        }
    );
  }

  Bl(i: number) {
    let a = false;
    this.bl[i] = !this.bl[i];
    for (let q = 0; q < 30; q++) {
      if (this.bl[q] === true) {
        a = true;
      }
    }
    if (a === true) {
      this.updateddata = this.prof.filter(pr => {
        for (let j = 0; j < 30; j++) {
          if (this.bl[j] === true && this.lengs[j] === pr.language) {
            return true;
          }
        }
        return false;
      });
      this.dataSource = new MatTableDataSource(this.updateddata);
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource = new MatTableDataSource(this.prof);
      this.dataSource.paginator = this.paginator;
    }
  }

  Update() {
    this.searchService.getAllResults().then(profiles => {
      this.prof = profiles;
    });
    let a = false;
    for (let q = 0; q < 30; q++) {
      if (this.bl[q] === true) {
        a = true;
      }
    }
      if (a === true) {
        this.updateddata = this.prof.filter(pr => {
          for (let j = 0; j < 30; j++) {
            if (this.bl[j] === true && this.lengs[j] === pr.language) {
              return true;
            }
          }
        });
        this.dataSource = new MatTableDataSource(this.updateddata);
        this.dataSource.paginator = this.paginator;
      }
    }
}

