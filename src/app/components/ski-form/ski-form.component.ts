import {Component, OnInit} from '@angular/core';
import {ServiceJob, Ski, SkiService} from '../../../data/data';
import {SkiDataService} from '../../services/ski-data.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, Location, NgForOf} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ski-form',
  imports: [
    FormsModule,
    DatePipe,
    NgForOf
  ],
  templateUrl: './ski-form.component.html',
  styleUrl: './ski-form.component.scss'
})
export class SkiFormComponent implements OnInit {

  jobTranslations = {
    [ServiceJob.WAX]: 'Wachsen',
    [ServiceJob.EDGES]: 'Kanten schleifen',
    [ServiceJob.REPAIR]: 'Belagreparatur',
  }

  ski: Ski | undefined;
  serviceDates: Map<string, string> = new Map();

  availableJobs: ServiceJob[] = Object.values(ServiceJob) as ServiceJob[];

  constructor(
    private route: ActivatedRoute,
    private readonly skiDataService: SkiDataService,
    private location: Location,
  ) {
    this.ski = skiDataService.getSki(route.snapshot.params['id']);
    if (!this.ski) {
      this.location.back();
    }
  }

  ngOnInit(): void {
    if (this.ski) {
      this.ski.services.forEach(service => {
        this.serviceDates.set(service.id, this.toYYYYMMDD(service.date));
      });
    }
  }

  private toYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateServiceDate(service: SkiService, dateString: string): void {
    service.date = new Date(dateString);
    this.serviceDates.set(service.id, dateString);
  }

  isJobSelected(service: SkiService, job: ServiceJob): boolean {
    return service.jobs.includes(job);
  }

  onJobSelectionChange(event: any, service: SkiService, job: ServiceJob) {
    if (event.target.checked) {
      if (!this.isJobSelected(service, job)) {
        service.jobs.push(job);
      }
    } else {
      const index = service.jobs.indexOf(job);
      if (index > -1) {
        service.jobs.splice(index, 1);
      }
    }
  }

  addService(): void {
    if (this.ski) {
      const newService: SkiService = {
        id: `new-${Date.now()}`,
        date: new Date(),
        jobs: [ServiceJob.WAX, ServiceJob.EDGES]
      };
      this.ski.services.push(newService);
      this.serviceDates.set(newService.id, this.toYYYYMMDD(newService.date));
    }
  }

  removeService(serviceToRemove: SkiService): void {
    if (this.ski) {
      this.ski.services = this.ski.services.filter(service => service.id !== serviceToRemove.id);
      this.serviceDates.delete(serviceToRemove.id);
    }
  }

  back(): void {
    this.location.back();
  }
}
