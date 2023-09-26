

export abstract class StorageProvider {
    abstract upload(file: any, folder?: string): Promise<string>
    abstract delete(filename: string): Promise<void>
}