const PRIORITY = 'Priority';
const PRIORITY_LOW = 'Low';
const PRIORITY_MEDIUM = 'Medium';
const PRIORITY_HIGH = 'High';
const PRIORITY_URGENT = 'Urgent';

const STATUS = 'Status';
const NOT_STARTED = 'Not Started';
const IN_PROGRESS = 'In Progress';
const COMPLETED = 'Completed';
const ARCHIVED = 'Archived';
const DELETED = 'Deleted';

const useTranslate = (category, status) => {

    if (category === PRIORITY) {
        switch (status) {
            case PRIORITY_LOW:
                return {
                    toSpanish: 'Baja',
                    modifier: 'low'
                }
            case PRIORITY_MEDIUM:
                return {
                    toSpanish: 'Media',
                    modifier: 'medium'
                }
            case PRIORITY_HIGH:
                return {
                    toSpanish: 'Alta',
                    modifier: 'high'
                }
            case PRIORITY_URGENT:
                return {
                    toSpanish: 'Urgente',
                    modifier: 'urgent'
                }
            default:
                return {
                    toSpanish: 'Baja',
                    modifier: 'low'
                }
        }
    }

    if (category === STATUS) {
        switch (status) {
            case NOT_STARTED:
                return 'No Iniciado';
            case IN_PROGRESS:
                return 'En Progreso';
            case COMPLETED:
                return 'Completado';
            case ARCHIVED:
                return 'Archivado';
            case DELETED:
                return 'Eliminado';
            default:
                return 'No Iniciado';
        }
    }

    return '';

}

export default useTranslate;