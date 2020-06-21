import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../shared/skeleton/header';
import {ButtonClass, ButtonSize, ButtonType} from '../../shared/components/buttons';
import {AuthService} from '../../core/services/auth';
import {MessagingService} from '../../core/services/messaging/messaging.service';
import {filter, takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../shared/components/base/base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OauthService} from '../../core/services/auth/oauth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseComponent implements OnInit, AfterContentInit {

    public readonly VALIDATION_CLASS = 'access';

    public tapButtonSize: ButtonSize = ButtonSize.BIG;
    public tapButtonType: ButtonType = ButtonType.WHITE_BORDER_ONLY;
    public tapButtonClass: ButtonClass = ButtonClass.TEXT;
    public icon = 'tick';
    public text = 'access';

    clickEventHandler = ($event: any) => this.changeButton($event);
    authClickEventHandler = () => this.handleAccess();
    changeInputEventHandler = ($event: any) => this.changeInputHandler($event);


    constructor(private readonly headerService: HeaderService,
                private readonly authService: AuthService,
                private readonly messagingService: MessagingService,
                private readonly cdRef: ChangeDetectorRef,
                private readonly router: Router,
                private readonly route: ActivatedRoute,
                private readonly oauthService: OauthService) {
        super();
    }

    ngOnInit(): void {
        this.messagingService.getMessage(this.VALIDATION_CLASS)
            .pipe(
                filter(value => !!value),
                takeUntil(this.destroy$)
            )
            .subscribe(value => {
                this.tapButtonType = ButtonType.ERROR_BORDER_AND_TEXT;
                this.cdRef.markForCheck();
            });
    }


    ngAfterContentInit(): void {
        this.headerService.mayShowHeader(false);
    }

    get defaultClickEventHandler(): ($event) => void {
        return this.clickEventHandler;
    }

    get handleAuthClickEvent(): ($event) => void {
        return this.authClickEventHandler;
    }

    get handleChangeInputEventHandler(): ($event) => void {
        return this.changeInputEventHandler;
    }

    private changeButton($event: any): void {
        this.tapButtonType = ButtonType.WHITE_BORDER_ONLY;
        const node: any = $event.target;
        node.style.width = '33vw';
        node.style.maxWidth = '300px';
        node.style.minWidth = '200px';
        node.setAttribute('width', '10rem');
        this.tapButtonClass = ButtonClass.PASSWORD;
        this.messagingService.clear();
        this.cdRef.markForCheck();
    }

    private changeInputHandler(keyValue: string): void {
        if (keyValue.length === 4) {
            this.text = null;
            if (this.authService.validate(keyValue)) {
                this.handleAccessSuccessfull();
            }
        }
    }

    private handleAccessSuccessfull() {
        this.tapButtonClass = ButtonClass.ICON;
        this.tapButtonType = ButtonType.SUCCESS;
        this.cdRef.markForCheck();
        setTimeout(() => {
            this.headerService.mayShowHeader(true);
            this.router.navigate(['/rooms']);
        }, 1000);
    }

    private handleAccess() {
        if (this.oauthService.isAuthenticated()) {
            this.router.navigate(['/rooms']);
        } else {
            this.oauthService.loginWithRedirect();
        }
    }
}

