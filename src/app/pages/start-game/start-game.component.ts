import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent {
  public isLoading = false;

  constructor(
    public router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  /**
   * Função responsável por dar play no jogo, redirecionando para a página do game.
   */
  public async startGame(): Promise<void> {
    try {
      this.isLoading = true;

      const token = this.tokenService.get();
      const game = this.tokenService.getGameData();

      if (token !== null && !game) {
        const data = { token: token };
        const response = await this.userService.startGame(data);
        this.tokenService.saveGameData(response.data!);
      }
      this.isLoading = true;
      this.router.navigate(['/game']);
    } catch (error) {
      this.isLoading = false;
      console.error('error', error);
    }
  }
}
