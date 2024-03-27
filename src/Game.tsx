import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {Container} from "@mui/material";
import {Tool} from "./data/tool";
import {GameData} from "./gamedata/gamedata";
import {Resources} from "./data/ResourceList";
import UpgradeSelector from "./UpgradeSelector/UpgradeSelector";
import OpenCraftingModal from "./Crafting/OpenCraftingModal";
import OpenCraftingModalButton from "./Crafting/OpenCraftingModal";

interface WoodCollectorProps {
    tool: Tool,
    resource: Resources
}

interface AppState {
    cooldownProgress: number;
    game: GameData;
}

class WoodCollector extends Component<WoodCollectorProps, AppState> {
    cooldownInterval: NodeJS.Timeout | null;

    constructor(props: WoodCollectorProps) {
        super(props);
        this.state = {
            game: GameData.getInstance(),
            cooldownProgress: GameData.getInstance().getGatherProgress(Resources.WOOD),
        };
        this.cooldownInterval = null;

        if (this.state.cooldownProgress) {
            this.startUpdateLoop();
        }
    }

    startUpdateLoop = () => {
        // Clear existing interval if present
        if (this.cooldownInterval) {
            clearInterval(this.cooldownInterval);
        }

        // If cooldown is active, start a new interval to update the progress bar
        if (this.state.cooldownProgress !== 100) {
            this.cooldownInterval = setInterval(() => {
                this.setState({
                    cooldownProgress: this.state.game.getGatherProgress(Resources.WOOD),
                });
            }, 350 + Math.random() * 250);
        }
    }

    componentDidUpdate(prevProps: {}, prevState: AppState) {
        const {cooldownProgress} = prevState;
        const newCooldownProgress = this.state.game.getGatherProgress(Resources.WOOD);
        if (
            cooldownProgress !== newCooldownProgress
        ) {
            // Clear existing interval if present
            if (this.cooldownInterval) {
                clearInterval(this.cooldownInterval);
            }

            // If cooldown is active, start a new interval to update the progress bar
            if (this.state.cooldownProgress !== 100) {
                this.cooldownInterval = setInterval(() => {
                    this.setState({
                        cooldownProgress: newCooldownProgress
                    })
                }, 350 + Math.random() * 250);
            }
        } else {
            if (this.cooldownInterval) {
                clearInterval(this.cooldownInterval);
            }
        }
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted
        if (this.cooldownInterval) {
            clearInterval(this.cooldownInterval);
        }
    }

    handleButtonClick = () => {
        if (this.state.cooldownProgress === 0) {
            this.state.game.gather(Resources.WOOD);
            this.forceUpdate()
        }
    };

    render() {
        const woodCount = this.state.game.getResourceCount(Resources.WOOD);
        const cooldownProgress = this.state.game.getGatherProgress(Resources.WOOD);

        return (
            <Container>
                <Grid container spacing={4} sx={{alignItems: 'center'}}>
                    <Grid item xs={6} sx={{border: 'solid red 1px'}}>
                        <Typography variant="h5">Wood: {woodCount}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{border: 'solid red 1px'}}>
                        <Button
                            variant="contained"
                            disabled={cooldownProgress !== 0}
                            onClick={this.handleButtonClick}
                        >
                            Gather Wood
                        </Button>
                        <LinearProgress
                            variant="determinate"
                            value={cooldownProgress}
                            sx={{
                                width: 'calc(100% - 48px)',
                                marginTop: 8,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{alignItems: 'center'}}>
                    <Grid item></Grid>
                </Grid>
                <UpgradeSelector />
                <OpenCraftingModalButton />
            </Container>
        );
    }
}

export default WoodCollector;
