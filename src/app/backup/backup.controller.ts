import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BackupService } from './backup.service';

@ApiTags('Бэкап')
@Controller('backup')
export class BackupController {
  constructor(private backupService: BackupService) {}
}
