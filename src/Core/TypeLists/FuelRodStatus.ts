abstract class FuelRodStatus {
    public static HEALTHY: {id: number, name: string, description: string} = {id: 0, name: 'HEALTHY', description: ''};
    public static IRRADIATED: {id: number, name: string, description: string} = {id: 1, name: 'IRRADIATED', description: ''};
    public static HOT: {id: number, name: string, description: string} = {id: 2, name: 'HOT', description: ''};
    public static COLD: {id: number, name: string, description: string} = {id: 3, name: 'COLD', description: ''};
}

export default FuelRodStatus;