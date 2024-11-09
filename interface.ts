interface Resolution {
    width: number;
    height: number;
    fps: number;
}

interface IScreen {
    resolution: Resolution;
    brightness: number;
    manufacturer: string;
}

interface CPU {
    cores: number;
    manufacturer: string;
}

interface RAM {
    memory: number;
}

interface GPU {
    memory: number; 
}

interface Laptop {
    screen: IScreen;
    cpu: CPU;
    ram: RAM;
    gpu: GPU;
}

const laptop: Laptop = {
    screen: {
        resolution: {
            width: 4096,
            height: 2156,
            fps: 120
        },
        brightness: 1200,
        manufacturer: 'Samsung'
    },

    cpu: {
        cores: 8,
        manufacturer: 'Intel'
    },

    ram: {
        memory: 16
    },

    gpu: {
        memory: 6 
    }
}

console.log(laptop);

