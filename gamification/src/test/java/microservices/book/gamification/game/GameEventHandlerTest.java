package microservices.book.gamification.game;

import microservices.book.gamification.challenge.ChallengeSolvedEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class GameEventHandlerTest {

    private GameEventHandler gameEventHandler;

    @Mock
    GameService gameService;

    @BeforeEach
    public void setUp(){
        gameEventHandler = new GameEventHandler(gameService);
    }

    @Test
    public void handleSolvedEventCorrect(){
        // given
        ChallengeSolvedEvent event =
                new ChallengeSolvedEvent(1L, true, 20,20,2L,"toma");

        // when
        gameEventHandler.handleMultiplicationSolved(event);

        // then
        verify(gameService).newAttemptForUser(event);
    }

}
