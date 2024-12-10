FROM mongo:8.0.3

# Variáveis de ambiente
ENV MONGO_REPLICA_PORT=27017
ENV MONGO_REPLICA_HOST=localhost

# Comando para inicializar o MongoDB com Replica Set
CMD mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
    # Comando para inicializar o Replica Set
    INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] });"; \
    # Comando para criar usuário root se não existir
    INIT_USER_CMD="db.getSiblingDB('admin').getUser('$MONGO_INITDB_ROOT_USERNAME') || \
                   db.getSiblingDB('admin').createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', \
                   pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [{ role: 'root', db: 'admin' }] });"; \
    # Aguarda o Replica Set estar pronto
    until mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD" 2>&1 | grep -q "MongoServerError: already initialized"; do sleep 1; done; \
    # Cria o usuário root
    echo "REPLICA SET ONLINE" && mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_USER_CMD"; \
    # Mantém o container ativo
    wait $MONGOD_PID;
