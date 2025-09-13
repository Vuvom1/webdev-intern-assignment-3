
# revision identifiers, used by Alembic.
revision = '4b1a67d08800'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

def upgrade():
	op.create_table(
		'student_scores',
		sa.Column('sbd', sa.String(), primary_key=True, index=True),
		sa.Column('toan', sa.Float(), nullable=True),
		sa.Column('ngu_van', sa.Float(), nullable=True),
		sa.Column('ngoai_ngu', sa.Float(), nullable=True),
		sa.Column('vat_li', sa.Float(), nullable=True),
		sa.Column('hoa_hoc', sa.Float(), nullable=True),
		sa.Column('sinh_hoc', sa.Float(), nullable=True),
		sa.Column('lich_su', sa.Float(), nullable=True),
		sa.Column('dia_li', sa.Float(), nullable=True),
		sa.Column('gdcd', sa.Float(), nullable=True),
		sa.Column('ma_ngoai_ngu', sa.String(), nullable=True)
	)

def downgrade():
	op.drop_table('student_scores')
