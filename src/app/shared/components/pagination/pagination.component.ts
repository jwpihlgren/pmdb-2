import { Component, computed, input, InputSignal, OnInit, output, OutputEmitterRef, Signal } from '@angular/core';
import { Pagination } from '../../models/interfaces/pagination';
import { PageButton } from '../../models/interfaces/page-button';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

    pagination: InputSignal<Pagination> = input.required<Pagination>()
    pageRequest: OutputEmitterRef<number> = output<number>()
    pageButtons!: Signal<PageButton[]>

    generatePageButtons(pagination: Pagination): PageButton[] {
        const pageButtons: PageButton[] = []
        const page: number = pagination.page
        const maxPage: number = pagination.totalPages - 1
        pageButtons.push({ page: 1, isCurrent: false, disabled: page === 1, content: `<<` })
        if (page >= 2) pageButtons.push({ page: page - 1, isCurrent: false, disabled: page < 2, content: `${page - 1}` })
        pageButtons.push({ page: page, isCurrent: true, disabled: true, content: `${page}` })
        if (page < maxPage) pageButtons.push({ page: page + 1, isCurrent: false, disabled: page >= maxPage, content: `${page + 1}` })
        pageButtons.push({ page: maxPage, isCurrent: false, disabled: page === maxPage, content: `>>` })
        return pageButtons
    }

    requestPage(page: number): void {
        this.pageRequest.emit(page)
    }

    ngOnInit(): void {
        this.pageButtons = computed(() => this.generatePageButtons(this.pagination()))
    }
}

