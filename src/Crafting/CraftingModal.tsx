import React, { Component, RefObject } from 'react';
import { Modal, Grid, Paper } from '@mui/material';

// Define the crafting recipe, for example, crafting a sword
const craftingRecipe = [
  ['iron', 'iron', 'iron'],
  [null, 'stick', null],
  [null, 'stick', null]
];

// Define the items that can be used in crafting
const items: { [key: string]: string } = {
  'iron': 'Iron Ingot',
  'stick': 'Stick'
};

interface CraftingModalProps {
  open: boolean;
  onClose: () => void;
}

interface CraftingModalState {
  craftingGrid: string[][];
  inventory: string[];
  selectedItem: string | null;
  mouseX: number;
  mouseY: number;
}

class CraftingModal extends Component<CraftingModalProps, CraftingModalState> {
  modalRef: RefObject<HTMLDivElement>;

  constructor(props: CraftingModalProps) {
    super(props);
    this.state = {
      craftingGrid: [...Array(3)].map(() => Array(3).fill(null)),
      inventory: ['iron', 'iron', 'stick', 'stick'], // dummy inventory items
      selectedItem: null,
      mouseX: 0,
      mouseY: 0
    };
    this.modalRef = React.createRef();
  }

  handleItemClick = (selectedItem: string) => {
    this.setState({ selectedItem });
  };

  handleGridClick = (x: number, y: number) => {
    const { craftingGrid, selectedItem } = this.state;
    const newGrid = [...craftingGrid];
    const clickedItem = newGrid[y][x];

    if (selectedItem !== null) {
      if (clickedItem !== null) {
        // Swap items if there's already an item in the crafting grid
        const inventory = [...this.state.inventory];
        inventory.push(clickedItem);
        newGrid[y][x] = selectedItem;
        this.setState({ craftingGrid: newGrid, inventory, selectedItem: null });
      } else {
        newGrid[y][x] = selectedItem;
        this.setState({ craftingGrid: newGrid, selectedItem: null });
      }
    }
  };

  handleCraft = () => {
    // Check if the current crafting grid matches the recipe
    const isCraftable = craftingRecipe.every((row, y) =>
        row.every((recipeItem, x) => recipeItem === null || recipeItem === this.state.craftingGrid[y][x])
    );

    if (isCraftable) {
      alert('Crafting successful!');
      // Reset crafting grid
      this.setState({ craftingGrid: [...Array(3)].map(() => Array(3).fill(null)) });
    } else {
      alert('Crafting failed. Invalid recipe!');
    }
  };

  handleMouseMove = (event: MouseEvent) => {
    if (this.modalRef.current) {
      this.setState({
        mouseX: event.clientX - this.modalRef.current!.getBoundingClientRect().x!,
        mouseY: event.clientY - this.modalRef.current!.getBoundingClientRect().y!
      });
    }
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { open, onClose } = this.props;
    const { craftingGrid, inventory, selectedItem, mouseX, mouseY } = this.state;

    const modalStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#eee',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    };

    const paperStyle: React.CSSProperties = {
      padding: '16px',
      textAlign: 'center',
      color: 'black',
      cursor: 'pointer',
      minHeight: '50px'
    };

    const selectedStyle: React.CSSProperties = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 999,
      opacity: 0.7,
      width: '50px',
      height: '50px',
      background: 'lightblue',
      borderRadius: '50%',
      top: `${mouseY - window.scrollY - 25}px`, // Adjusting position relative to mouse coordinates and scroll position
      left: `${mouseX - window.scrollX - 25}px`,
      display: 'flex',
      justifyContent: 'center', // Centering horizontally
      alignItems: 'center', // Centering vertically
    };

    const closeButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    };

    return (
        <Modal open={open} onClose={onClose}>
          <div style={modalStyle} ref={this.modalRef}>
            <div style={closeButtonStyle} onClick={onClose}>X</div>
            <h2>Crafting Interface</h2>
            <div>
              <h3>Inventory</h3>
              <Grid container spacing={1}>
                {inventory.map((item, index) => (
                    <Grid item xs={3} key={index}>
                      <Paper
                          style={paperStyle}
                          onClick={() => this.handleItemClick(item)}
                      >
                        {items[item]}
                      </Paper>
                    </Grid>
                ))}
              </Grid>
            </div>
            <div>
              <h3>Crafting Grid</h3>
              <Grid container spacing={1}>
                {craftingGrid.map((row, y) =>
                    row.map((item, x) => (
                        <Grid item xs={4} key={`${x}-${y}`}>
                          <Paper
                              style={paperStyle}
                              onClick={() => this.handleGridClick(x, y)}
                          >
                            {item ? items[item] : 'Empty'}
                          </Paper>
                        </Grid>
                    ))
                )}
              </Grid>
              {selectedItem && (
                  <div style={selectedStyle}>
                    {items[selectedItem]}
                  </div>
              )}
              <button onClick={this.handleCraft}>Craft</button>
            </div>
          </div>
        </Modal>
    );
  }
}

export default CraftingModal;
