@Injectable()
export class AttendanceService {
    private attendances: AttendanceDto[] = []; // Usando um array em memória para simulação

    create(attendance: AttendanceDto): AttendanceDto {
        // Simulação de ID gerado como UUID (não se usa auto incremento para UUID)
        attendance.id = this.generateUUID();  // Alterado para usar um UUID
        this.attendances.push(attendance);
        return attendance;
    }

    findAll(): AttendanceDto[] {
        return this.attendances; // Retorna todos os atendimentos sem parâmetros adicionais
    }

    findOne(id: string): AttendanceDto | undefined {  // Alterado para usar string
        return this.attendances.find(att => att.id === id);
    }

    update(id: string, updateAttendance: Partial<AttendanceDto>): AttendanceDto | undefined {  // Alterado para usar string
        const attendance = this.findOne(id);
        if (attendance) {
            Object.assign(attendance, updateAttendance);
            return attendance;
        }
        return undefined;
    }

    remove(id: string): boolean {  // Alterado para usar string
        const index = this.attendances.findIndex(att => att.id === id);
        if (index !== -1) {
            this.attendances.splice(index, 1);
            return true;
        }
        return false;
    }

    // Função simples para gerar um UUID
    private generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
